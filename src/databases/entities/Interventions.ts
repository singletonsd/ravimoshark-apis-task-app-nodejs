import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Pieces } from "./Pieces";
import { Tasks } from "./Tasks";

@Entity("TachesIntervention")
export class Interventions {

    @PrimaryGeneratedColumn({
        name: "id",
        type: "int"
    })
    public id?: number;

    @ManyToOne(() => Tasks, (tasks: Tasks) => tasks.interventions, { nullable: false })
    @JoinColumn({ name: "TachesId" })
    public tasks?: Tasks | null;

    @RelationId((interventions: Interventions) => interventions.tasks)
    public tasksId?: Array<number>;

    @ManyToOne(() => Pieces, (pieces: Pieces) => pieces.interventions, { nullable: false })
    @JoinColumn({ name: "RefArticle" })
    public refArticle?: Pieces | null;

    @RelationId((interventions: Interventions) => interventions.refArticle)
    public refArticleId?: Array<string>;

    @Column("int", {
        default: () => "(0)",
        name: "Quantite",
        nullable: true
    })
    public quantity?: number | null;

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

    public constructor(init?: Partial<Interventions>) {
        Object.assign(this, init);
    }
}
