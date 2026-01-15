export interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

export interface ArtworkApiResponse {
  data: Artwork[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
}

export async function fetchArtworks(
  page: number,
  limit: number
): Promise<ArtworkApiResponse> {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch artworks');
  }

  return response.json();
}

