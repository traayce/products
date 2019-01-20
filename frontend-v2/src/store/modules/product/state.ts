import { ProductDTO } from "./dto";
export interface IState {
  products: Array<ProductDTO>;
  isLoading: boolean;
  error: string | undefined;
}
