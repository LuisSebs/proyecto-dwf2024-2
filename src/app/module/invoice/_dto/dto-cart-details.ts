/* REQUERIMIENTO 4. Implementar dto Invoice */
import { Product } from "../../product/_model/product";

export class DtoCartDetails{
    // YOUR CODE GOES HERE!
    cart_id: number = 0;
    gtin: string =  "";
    image: string = "";
    product: Product = new Product();
    quantity: number = 0;
}