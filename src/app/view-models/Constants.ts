export class API{
    public static devBaseURL = "http://localhost:6789/";
    public static prodBaseURL = "https://rentify-backend-isu8.onrender.com/";
}

export interface Filter {
    price: string;
    bedrooms: string;
    bathrooms: string;
  }

