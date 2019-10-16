import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Pieces } from "./Pieces";
import { Tasks } from "./Tasks";
import { Visits } from "./Visits";

@Entity("Machine")
@Index("UQ_Machine_NumSerie", ["serialNumber"], { unique: true })
export class Machines {

    @PrimaryGeneratedColumn({
        name: "id",
        type: "int"
    })
    public id?: number;

    @Column("nvarchar", {
        name: "NumSerie",
        nullable: false
    })
    public serialNumber?: string;

    @ManyToOne(() => Pieces, (pieces: Pieces) => pieces.machines, { nullable: false })
    @JoinColumn({ name: "RefArticle" })
    public piece?: Pieces | null;

    @RelationId((machine: Machines) => machine.piece)
    public refArticle?: string;

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

    @OneToMany(() => Tasks, (taches: Tasks) => taches.machine)
    public tasks?: Array<Tasks>;

    @OneToMany(() => Visits, (visits: Visits) => visits.machine)
    public visits?: Array<Visits>;

    public constructor(init?: Partial<Machines>) {
        Object.assign(this, init);
    }
}
