package com.programacionIV.proyectoFinal.api;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.programacionIV.proyectoFinal.entidades.Producto;
import com.programacionIV.proyectoFinal.servicios.ProductoServicio;

@RestController
public class ProductoController {

	private final ProductoServicio productoServicio;

	public ProductoController(ProductoServicio productoServicio) {
		this.productoServicio = productoServicio;
	}

	@GetMapping(path = "/productos", produces = "application/json")
	public Page<Producto> listadoProductos(
			@PageableDefault(sort = "fechaInclusion", direction = Sort.Direction.DESC, size = 12) Pageable pageable) {

		return productoServicio.obtenerProductosPaginados(pageable);

	}

	/**
	 * Devuelve una lista de productos filtrada mediante el query param
	 * "categorias", para utilizarlo se agrega en la URL
	 * "categorias=categoria1,categoria2"
	 *
	 * @param categorias es la lista que se recibe del query params con las
	 *                   categorias que el api filtrará a la hora de devolver la
	 *                   lista
	 * @param pageable   objecto pageable que se utiliza para la paginación, se
	 *                   utiliza con el query param "page=n", tambien para modificar
	 *                   la cantidad de registros que mostraran por pagina con
	 *                   "size=n"
	 * @return json con una lista de objetos tipo producto
	 */
	@GetMapping(path = "/productos/filtered", produces = "application/json")
	public Page<Producto> listadoProductosFiltered(
			@RequestParam(name = "categorias", required = true) List<String> categorias, Pageable pageable) {


		return productoServicio.obtenerProductosFiltradosPorCategoria(categorias, pageable);

	}

	@GetMapping(path =  "/productos/categories", produces = "application/json")
	public List<String> listadoCategories() {
		return productoServicio.obtenerCategoriasConStock();
	}
	
	@GetMapping(path = "/productos/tendencia", produces = "application/json")
	public Page<Producto> listadoProductosTendencia(Pageable pageable) {
		return productoServicio.obtenerProductosTendendia(pageable);
	}

	@PostMapping("/productos/create")
	public ResponseEntity<String> crearProducto(@RequestBody Producto JsonProducto) {
		try {
			if (JsonProducto.getNombre().isBlank()) {
				return ResponseEntity.ok().body("El nombre no puede ser nulo");
			} else {
				productoServicio.crearProducto(JsonProducto);
				return ResponseEntity.ok().body("Producto creado con éxito");
			}

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

		
		
		
	}
	
	
	@GetMapping(path = "/productos/buscarProductos", produces = "application/json")
    public Page<Producto> buscarProductos(@RequestParam String nombre, Pageable pageable) {
        return productoServicio.buscarProductosPorNombre(nombre, pageable);
    }
	
	

}
