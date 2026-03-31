SELECT 
	s.dtRequisicao, 
    s.dtInicio, 
    s.dtFim, 
    s.vCustoMaterial, 
    s.vCustoMaoDeObra, 
	c.nmCliente,
    c.nmEndereco,
    c.nmContato,
    c.nmCPF,
    c.nmCNPJ,
    s.idPrestador
FROM servico s
JOIN cliente c
ON s.idCliente = c.idCliente