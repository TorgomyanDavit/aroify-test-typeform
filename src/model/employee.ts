import { DataTypes } from 'sequelize';
import sequelize from '../sequilizer';

const Employee = sequelize.define('employees', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true, // Modify as needed
  },
  job_title: {
    type: DataTypes.STRING,
    allowNull: true, // Modify as needed
  },
  salary: {
    type: DataTypes.FLOAT, // Modify the data type as needed
    allowNull: true, // Modify as needed
  },
}, {
  timestamps: false,
});

export default Employee;
