"use strict";

import { getConnection } from "typeorm";
import { Machines } from "../databases/entities";
import { LoggerUtility } from "../utils/LoggerUtility";
import { VALID_RESPONSES } from "../utils/ValidResponses";

const SERVICE_NAME = "MachinesService";

export class MachinesService {

    /**
     *  Check if a machine exits.
     * @param id
     */
    public static exists(id: number): Promise<boolean> {
        const FUNCTION_NAME = "exists";
        const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
        return new Promise<boolean>(async (resolve) => {
            const previous = await getConnection().manager.findOne(Machines, {
                select: [ "id" ],
                where: { id }
            });
            if (!previous) {
                LoggerUtility.warn(`${logHeader} ${VALID_RESPONSES.ERROR.NOT_EXIST.MACHINE} ${id}`);
                resolve(false);
                return;
            }
            resolve(true);
            return;
        });
    }

}
