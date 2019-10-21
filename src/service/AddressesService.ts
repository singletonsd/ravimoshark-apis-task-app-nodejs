"use strict";

import { getConnection } from "typeorm";
import { Addresses } from "../databases/entities";
import { DatabaseUtilities } from "../databases/utils/DatabaseUtils";
import { Metadata } from "../models";
import { LoggerUtility } from "../utils/LoggerUtility";
import { ParametersComplete, ParametersIdDeleted, Utilities } from "../utils/utilities";
import { VALID_RESPONSES } from "../utils/ValidResponses";

const SERVICE_NAME = "AddressesService";
export class AddressesService {

    /**
     *  Check if a machine exits.
     * @param id
     */
    public static exists(id: number): Promise<boolean> {
      const FUNCTION_NAME = "exists";
      const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
      return new Promise<boolean>(async (resolve) => {
          const previous = await getConnection().manager.findOne(Addresses, {
              select: [ "id" ],
              where: { id }
          });
          if (!previous) {
              LoggerUtility.warn(`${logHeader} ${VALID_RESPONSES.ERROR.NOT_EXIST.TECHNICIAN} ${id}`);
              resolve(false);
              return;
          }
          resolve(true);
          return;
      });
  }

}
