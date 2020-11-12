const soloActivos = (confirmar) => {
  if (confirmar) {
    return { activo: true };
  } else {
    return {};
  }
};

module.exports = {
  soloActivos,
};
