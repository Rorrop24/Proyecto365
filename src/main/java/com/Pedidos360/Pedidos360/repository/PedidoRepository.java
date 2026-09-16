package com.Pedidos360.Pedidos360.repository;

import com.Pedidos360.Pedidos360.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}