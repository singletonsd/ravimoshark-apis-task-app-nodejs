import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Addresses } from "./Addresses";
import { Machines } from "./Machines";
import { Technicians } from "./Technicians";

@Entity("Visite")
export class Visits {

    @PrimaryGeneratedColumn({
        name: "id",
        type: "int"
    })
    public id?: number;

    @ManyToOne(() => Addresses, (address: Addresses) => address.visits, {  })
    @JoinColumn({ name: "ClientsAddressid"})
    public address?: Addresses | null;

    @RelationId((visits: Visits) => visits.address)
    public addressId?: number;

    @Column("datetimeoffset", {
        name: "DateVisite",
        nullable: true
    })
    public dateVisit?: Date | null;

    @ManyToOne(() => Machines, (machine: Machines) => machine.visits, {  })
    @JoinColumn({ name: "MachineId"})
    public machine?: Machines | null;

    @RelationId((visits: Visits) => visits.machine)
    public machineId?: number;

    @Column("int", {
        name: "TH",
        nullable: true
        })
    public th?: number | null;

    @ManyToOne(() => Technicians, (technician: Technicians) => technician.visits, {  nullable: false })
    @JoinColumn({ name: "ZoneResaId"})
    public technician?: Technicians | null;

    @RelationId((visit: Visits) => visit.technician)
    public technicianId?: number;

    @Column("int", {
        name: "TemperatureLavage",
        nullable: true
        })
    public tempWashing?: number | null;

    @Column("int", {
        name: "TemperatureRincage",
        nullable: true
        })
    public tempRinsing?: number | null;

    @Column("int", {
        name: "Conductivite",
        nullable: true
        })
    public conductivity?: number | null;

    @Column("nvarchar", {
        length: 1500,
        name: "Commentaire",
        nullable: true
        })
    public comments?: string | null;

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

    public constructor(init?: Partial<Visits>) {
        Object.assign(this, init);
    }

}
