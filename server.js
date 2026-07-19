const express = require("express");

const { obtenerJoyas, obtenerJoyasPorFiltros } = require("./consultas");

const app = express();

app.use(express.json());

// Middleware de reporte
app.use((req, res, next) => {
  console.log(`Se realizó una consulta a la ruta: ${req.method} ${req.url}`);
  next();
});

const prepararHATEOAS = (joyas) => {
  const results = joyas.map((joya) => {
    return {
      name: joya.nombre,
      href: `/joyas/joya/${joya.id}`,
    };
  });

  const totalJoyas = joyas.length;
  const stockTotal = joyas.reduce((total, joya) => total + joya.stock, 0);

  return {
    totalJoyas,
    stockTotal,
    results,
  };
};

app.get("/joyas", async (req, res) => {
  try {
    const joyas = await obtenerJoyas(req.query);
    const HATEOAS = prepararHATEOAS(joyas);

    res.json(HATEOAS);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener las joyas" });
  }
});

app.get("/joyas/filtros", async (req, res) => {
  try {
    const joyas = await obtenerJoyasPorFiltros(req.query);

    res.json(joyas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al filtrar las joyas" });
  }
});

app.listen(3000, () => {
  console.log("Servidor levantado en puerto 3000");
});
