export interface Photo {
    id: string;
    urls: {
      small: string;
    };
    alt_description: string;
    blur_hash: string;
    color: string;
    created_at: string;
    dateFavoriteAdd?: string;
    description: string;
    height: number;
    liked_by_user: boolean;
    likes: number;
    links: {
      self: string;
      html: string;
      download: string;
      download_location: string;
    };
    promoted_at: string;
    slug: string;
    updated_at: string;
    topic_submissions: {
      [category: string]: {status: string;}
    };
    user: {
      id: string;
      updated_at: string;
      username: string;
      name: string;
      first_name: string;
    };
    width: number;
  }
    export interface Category {
      id: string;
      title: string;
    }
    
    
    