import { Column, Model, Table } from 'sequelize-typescript';

@Table({modelName: 'users', createdAt: false, updatedAt: false})
export class User extends Model {
  @Column
  name: string;

  @Column({unique: true})
  email: string;

  @Column
  password: string;
}