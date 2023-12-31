const {
  getSales,
  getSaleById,
  changeSale,
  deleteSale,
  addSale,
} = require('../models/salesMdl');

const { updateProductStock } = require('./productSrvc');

const getAllSales = async () => getSales();

const getSalesById = async (id) => getSaleById(id);

const updateSales = async (id, sale) => changeSale(id, sale);

const add = async (sales) => {
  sales.forEach(({ productId, quantity }) => {
    updateProductStock(productId, -quantity);    
  });
 return addSale(sales);
};

const remove = async (id) => {
  const { itensSold } = await getSaleById(id);

  itensSold.forEach(({ productId, quantity }) => {
    updateProductStock(productId, quantity);    
  });
  return deleteSale(id); 
};

module.exports = {
  add,
  getAllSales,
  getSalesById,
  updateSales,
  remove,
};
