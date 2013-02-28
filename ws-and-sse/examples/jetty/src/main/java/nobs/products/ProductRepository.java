package nobs.products;

public class ProductRepository {
    public String getProduct(int id) {
        if (id > 5) {
            throw new RuntimeException("Product does not exist");
        } else {
            return "Product " + id;
        }
    }
}
