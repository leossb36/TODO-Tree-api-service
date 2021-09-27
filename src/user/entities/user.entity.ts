import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 200 })
  name: string;

  @ApiProperty()
  @Column({ length: 200 })
  email: string;

  @ApiProperty()
  @Column({ length: 200 })
  password: string;

  @ApiProperty()
  @Column({ type: Boolean })
  isAdmin: boolean;

  @BeforeInsert()
  emailTolowerCase() {
    this.email = this.email.toLowerCase();
  }
}
