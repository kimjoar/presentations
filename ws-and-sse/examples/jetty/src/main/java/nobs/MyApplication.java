package nobs;

import nobs.products.ProductRepository;
import nobs.products.ProductResource;

import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@SuppressWarnings("unused")
public class MyApplication extends Application {

    @Override
    public Set<Object> getSingletons() {
        HashSet<Object> objects = new HashSet<Object>();

        objects.add(new ProductResource(new ProductRepository()));

        return objects;
    }
}
