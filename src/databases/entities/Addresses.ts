import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Clients } from "./Clients";
import { Tasks } from "./Tasks";
import { Visits } from "./Visits";

@Entity("ClientsAddress")
export class Addresses {

    @PrimaryGeneratedColumn({
        name: "id",
        type: "int"
    })
    public id?: number;

    @ManyToOne(() => Clients, (clients: Clients) => clients.addresses, { nullable: false })
    @JoinColumn({ name: "RefClient" })
    public client?: Clients | null;

    @RelationId((clientsAddress: Addresses) => clientsAddress.client)
    public refClientId?: string;

    @Column("nvarchar", {
        length: 100,
        name: "Numero",
        nullable: true
    })
    public streetNumber?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Address",
        nullable: true
    })
    public streetName?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "CodePostal",
        nullable: true
    })
    public postalCode?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Complement",
        nullable: true
    })
    public complement?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Ville",
        nullable: true
    })
    public city?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Pays",
        nullable: true
    })
    public country?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Telephone",
        nullable: true
    })
    public telephone?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Nom",
        nullable: true
    })
    public name?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Livraison",
        nullable: true
    })
    public delivery?: string | null;

    @Column("float", {
        name: "Lat",
        nullable: true,
        precision: 53
    })
    public latitude?: number | null;

    @Column("float", {
        name: "Long",
        nullable: true,
        precision: 53
    })
    public longitude?: number | null;

    @Column("nvarchar", {
        length: 100,
        name: "TypeAddress",
        nullable: true
    })
    public addressType?: string | null;

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

    @OneToMany(() => Tasks, (taches: Tasks) => taches.address)
    public tasks?: Array<Tasks>;

    @OneToMany(() => Visits, (visits: Visits) => visits.address)
    public visits?: Array<Visits>;

    public constructor(init?: Partial<Addresses>) {
        Object.assign(this, init);
    }
}
