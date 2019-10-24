import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Addresses } from "./Addresses";
import { Interventions } from "./Interventions";
import { Machines } from "./Machines";
import { Technicians } from "./Technicians";

@Entity("Taches")
export class Tasks {

    @PrimaryGeneratedColumn({
        name: "id",
        type: "int"
    })
    public id?: number;

    @ManyToOne(() => Technicians, (technician: Technicians) => technician.tasks, {})
    @JoinColumn({ name: "ZoneResaId" })
    public technician?: Technicians | null;

    @RelationId((taches: Tasks) => taches.technician)
    public technicianId?: number;

    @ManyToOne(() => Technicians, (technician: Technicians) => technician.tasks, {})
    @JoinColumn({ name: "Initiator" })
    public initiator?: Technicians | null;

    @RelationId((taches: Tasks) => taches.technician)
    public initiatorId?: number;

    @ManyToOne(() => Machines, (machine: Machines) => machine.tasks, {})
    @JoinColumn({ name: "MachineId" })
    public machine?: Machines | null;

    @RelationId((taches: Tasks) => taches.machine)
    public machineId?: number;

    @ManyToOne(() => Addresses, (address: Addresses) => address.tasks, {})
    @JoinColumn({ name: "ClientsAddressid" })
    public address?: Addresses | null;

    @RelationId((taches: Tasks) => taches.address)
    public addressId?: number;

    @Column("datetimeoffset", {
        name: "DateAppel",
        nullable: false
    })
    public dateCall?: Date;

    @Column("nvarchar", {
        length: 100,
        name: "TypeInter",
        nullable: true
    })
    public taskType?: string | null;

    @Column("nvarchar", {
        length: 1500,
        name: "DescriptionPanne",
        nullable: true
    })
    public problem?: string | null;

    @Column("int", {
        default: () => "(0)",
        name: "Priorite_Price",
        nullable: true
    })
    public priority?: number | null;

    @Column("datetimeoffset", {
        name: "Date_Depan",
        nullable: true
    })
    public dateFix?: Date | null;

    @Column("float", {
        default: () => "(0)",
        name: "MO",
        nullable: true,
        precision: 53
    })
    public taskTime?: number | null;

    @Column("nvarchar", {
        length: 1500,
        name: "DescriptionDepan",
        nullable: true
    })
    public solution?: string | null;

    @Column("bit", {
        default: () => "(0)",
        name: "SAVPayant",
        nullable: true,
        select: false
    })
    public SAVPayant?: boolean | null;

    @Column("int", {
        name: "Code",
        nullable: true
    })
    public code?: number | null;

    @Column("int", {
        name: "GPSStatusCode",
        nullable: true
    })
    public gpsStatusCode?: number | null;

    @Column("float", {
        name: "TechRating",
        nullable: true,
        precision: 53
    })
    public ratingTech?: number | null;

    @Column("float", {
        name: "ClientRating",
        nullable: true,
        precision: 53
    })
    public ratingClient?: number | null;

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

    @OneToMany(() => Interventions, (interventions: Interventions) => interventions.tasks)
    public interventions?: Array<Interventions>;

    public constructor(init?: Partial<Tasks>) {
        Object.assign(this, init);
    }
}
