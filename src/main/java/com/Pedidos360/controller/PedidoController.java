package com.Pedidos360.controller;

import com.Pedidos360.Pedido; // Si moviste Pedido.java a una carpeta 'entity', cambia esto por com.Pedidos360.entity.Pedido
import com.Pedidos360.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @GetMapping
    public List<Pedido> obtenerPedidos() {
        // Este es el endpoint que devolverá el JSON esperado cuando sea llamado por el API Manager
        return pedidoRepository.findAll();
    }
}