import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tasks } from "./Tasks";
import { Visits } from "./Visits";

@Entity("ZoneResa")
@Index("UQ_ZoneResa_Technicien", ["name"], { unique: true })
export class Technicians {

    @PrimaryGeneratedColumn({
        name: "id",
        type: "int"
    })
    public id?: number;

    @Column("nvarchar", {
        name: "Technicien",
        nullable: false
    })
    public name?: string;

    @Column("int", {
        default: () => "(0)",
        name: "VisiteResa",
        nullable: true,
        select: false
    })
    public visiteResa?: number | null;

    @Column("int", {
        default: () => "(0)",
        name: "DepanResa",
        nullable: true,
        select: false
    })
    public depanResa?: number | null;

    @Column("int", {
        name: "Secteur",
        nullable: true
    })
    public sector?: number | null;

    @Column("nvarchar", {
        name: "email",
        nullable: true
    })
    public email?: string | null;

    @Column("binary", {
        length: 64,
        name: "PasswordHash",
        nullable: true,
        select: false
    })
    public passwordHash?: Buffer | null;

    @Column("nvarchar", {
        length: 36,
        name: "Salt",
        nullable: true,
        select: false
    })
    public salt?: string | null;

    @Column("datetimeoffset", {
        default: () => "sysdatetimeoffset()",
        name: "__createdAt",
        nullable: false
    })
    public createdAt?: Date;

    @Column("datetimeoffset", {
        default: () => "sysdatetimeoffset()",
        name: "__updatedAt",
        nullable: false
    })
    public updatedAt?: Date;

    @Column("bit", {
        default: () => "(0)",
        name: "__deleted",
        nullable: false
    })
    public deleted?: boolean;

    @Column("int", {
        default: () => "(0)",
        name: "NbConnectionAtempt",
        nullable: true,
        select: false
    })
    public nbConnectionAtempt?: number | null;

    @Column("datetimeoffset", {
        name: "LastSuccessfulAttempt",
        nullable: true,
        select: false
    })
    public lastSuccessfulAttempt?: Date | null;

    @OneToMany(() => Tasks, (tasks: Tasks) => tasks.technician)
    public tasks?: Array<Tasks>;

    @OneToMany(() => Tasks, (tasks: Tasks) => tasks.initiator)
    public tasksInitiator?: Array<Tasks>;

    @OneToMany(() => Visits, (visits: Visits) => visits.technician)
    public visits?: Array<Visits>;

    public constructor(init?: Partial<Technicians>) {
        Object.assign(this, init);
    }
}
