import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth')
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  deviceid: string;

  @Column()
  platform: string;

  @Column()
  accesstoken: string;

  @Column()
  refreshtoken: string;
}
