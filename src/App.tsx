import { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import type { DataTablePageEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { fetchArtworks } from './services/artworkService';
import type { Artwork } from './services/artworkService';

function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);

  const [totalRecords, setTotalRecords] = useState(0);
  const [rows, setRows] = useState(10);
  const [first, setFirst] = useState(0);

  // store ONLY selected ids
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // overlay state
  const overlayRef = useRef<OverlayPanel>(null);
  const [selectCount, setSelectCount] = useState('');

  const currentPage = first / rows + 1;

  useEffect(() => {
    setLoading(true);

    fetchArtworks(currentPage, rows)
      .then((res) => {
        setArtworks(res.data);
        setTotalRecords(res.pagination.total);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [currentPage, rows]);

  const onPageChange = (event: DataTablePageEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  // derive selected rows ONLY for current page
  const selectedArtworks = artworks.filter((art) =>
    selectedIds.has(art.id)
  );

  const onSelectionChange = (value: Artwork[]) => {
    setSelectedIds((prev) => {
      const updated = new Set(prev);

      // add selected rows
      value.forEach((art) => {
        updated.add(art.id);
      });

      // remove unselected rows from current page
      artworks.forEach((art) => {
        if (!value.some((v) => v.id === art.id)) {
          updated.delete(art.id);
        }
      });

      return updated;
    });
  };

  // custom overlay selection (current page ONLY)
  const handleCustomSelection = () => {
    const count = parseInt(selectCount, 10);

    if (isNaN(count) || count <= 0) {
      overlayRef.current?.hide();
      setSelectCount('');
      return;
    }

    setSelectedIds((prev) => {
      const updated = new Set(prev);
      const rowsToSelect = artworks.slice(0, count);

      rowsToSelect.forEach((art) => {
        updated.add(art.id);
      });

      return updated;
    });

    overlayRef.current?.hide();
    setSelectCount('');
  };

  return (
    <div className="p-4">
      <h2 className="mb-3">Art Institute of Chicago</h2>

      <div className="mb-3">
        <Button
          label="Custom Select"
          icon="pi pi-check-square"
          onClick={(e) => overlayRef.current?.toggle(e)}
        />
      </div>

      <OverlayPanel ref={overlayRef}>
        <div className="flex flex-column gap-2">
          <label htmlFor="count">Select rows (current page)</label>
          <InputText
            id="count"
            value={selectCount}
            onChange={(e) => setSelectCount(e.target.value)}
            placeholder="Enter number"
          />
          <Button
            label="Apply"
            className="mt-2"
            onClick={handleCustomSelection}
          />
        </div>
      </OverlayPanel>

      <DataTable
        value={artworks}
        lazy
        paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPage={onPageChange}
        loading={loading}
        tableStyle={{ minWidth: '60rem' }}

        selection={selectedArtworks}
        onSelectionChange={(e) =>
          onSelectionChange(e.value as Artwork[])
        }
        selectionMode="multiple"
        dataKey="id"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Place of Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
      </DataTable>
    </div>
  );
}

export default App;
