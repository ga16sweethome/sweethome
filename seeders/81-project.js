"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Projects",
      [
        {
          code: "#P-0001",
          appointmentId: 1,
          uploadReceipt:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/180px-ReceiptSwiss.jpg",
          noteUploadReceipt: "bukti transfer",
          userId: 3,
          status: 3,
          totalPrice: 90000000,
          totalArea: 30,
          totalDuration: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "#P-0002",
          appointmentId: 6,
          userId: 4,
          status: 1,
          totalPrice: 80000000,
          totalArea: 20,
          totalDuration: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "#P-0003",
          appointmentId: 11,
          userId: 5,
          status: -1,
          totalPrice: 90000000,
          reasonCancel: "Kemahalan",
          totalArea: 20,
          totalDuration: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "#P-0004",
          appointmentId: 16,
          userId: 6,
          status: 2,
          totalPrice: 90000000,
          totalArea: 20,
          totalDuration: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "#P-0005",
          appointmentId: 21,
          userId: 7,
          status: 3,
          uploadReceipt:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/180px-ReceiptSwiss.jpg",
          noteUploadReceipt: "bukti transfer",
          totalPrice: 90000000,
          totalArea: 20,
          totalDuration: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "#P-0006",
          appointmentId: 22,
          userId: 8,
          status: 3,
          uploadReceipt:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/180px-ReceiptSwiss.jpg",
          noteUploadReceipt: "bukti transfer",
          totalPrice: 90000000,
          totalArea: 20,
          totalDuration: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "#P-0007",
          appointmentId: 23,
          userId: 9,
          status: 3,
          uploadReceipt:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/180px-ReceiptSwiss.jpg",
          noteUploadReceipt: "bukti transfer",
          totalPrice: 90000000,
          totalArea: 20,
          totalDuration: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "#P-0008",
          appointmentId: 24,
          userId: 7,
          status: 3,
          uploadReceipt:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/180px-ReceiptSwiss.jpg",
          noteUploadReceipt: "bukti transfer",
          totalPrice: 90000000,
          totalArea: 20,
          totalDuration: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "#P-0009",
          appointmentId: 25,
          userId: 8,
          status: 3,
          uploadReceipt:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/180px-ReceiptSwiss.jpg",
          noteUploadReceipt: "bukti transfer",
          totalPrice: 90000000,
          totalArea: 20,
          totalDuration: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
