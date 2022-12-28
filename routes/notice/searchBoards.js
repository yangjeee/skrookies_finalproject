// const { Boards } = require('../../models');
// const { Op } = require("sequelize");

// module.exports = {
//   get : async (req, res) =>{
//     const { search } = req.params;
//     // console.log(id)

//     Boards.findAll({
//       where : {
//         [Op.or] : [
//           {
//             title : {
//               [Op.like]: "%" + search + "%"
//             }
//           }, {
//             content : {
//               [Op.like]: "%" + search + "%"
//             }
//           }
//         ]          
//       },
//       order: [['createdAt', 'DESC']],
//       include : [
//         { model : Users, 
//           required: true, 
//           attributes : {exclude :["id","email","password", "salt", "createdAt", "updatedAt"]} }
//       ]
//     }).then(data => {
//         res.status(200).send(data)
//     })
//   }
// }
