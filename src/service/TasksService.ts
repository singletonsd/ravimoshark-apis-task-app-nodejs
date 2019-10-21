"use strict";

import { getConnection } from "typeorm";
import { Tasks } from "../databases/entities";
import { DatabaseUtilities } from "../databases/utils/DatabaseUtils";
import { Deleted, Metadata } from "../models";
import { LoggerUtility } from "../utils/LoggerUtility";
import { ParametersComplete, ParametersIdDeleted, Utilities } from "../utils/utilities";
import { VALID_RESPONSES } from "../utils/ValidResponses";
import { AddressesService } from "./AddressesService";
import { MachinesService } from "./MachinesService";
import { TechniciansService } from "./TechniciansService";

const SERVICE_NAME = "TasksService";
export class TasksService {

  public static unsafeProperties = ["priority", "dateFix", "taskTime", "ratingClient", "ratingTech"];

  public static removeUnsafeProperties(item: Tasks): Tasks {
    this.unsafeProperties.forEach((element) => {
      if (!item[element]) {
        delete item[element];
      }
    });
    return item;
  }

  /**
   * Add one task.
   * Add one task.
   *
   * body Tasks
   * returns Tasks
   */
  public static add(item: Tasks) {
    const FUNCTION_NAME = "add";
    const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
    return new Promise<Tasks>(async (resolve, reject) => {
        LoggerUtility.info(`${logHeader}`);
        LoggerUtility.debug(`${logHeader}`, item);
        const machineId = item.machine ? item.machine.id : item.machineId;
        if (machineId && ! await MachinesService.exists(machineId)) {
            reject(VALID_RESPONSES.ERROR.NOT_EXIST.MACHINE);
            return;
        }
        delete item.machine;
        delete item.machineId;
        item.machine = { id: machineId };
        LoggerUtility.info(`${logHeader} valid machine ${machineId}`);
        const technicianId = item.technician ? item.technician.id : item.technicianId;
        if (technicianId && ! await TechniciansService.exists(technicianId)) {
          reject(VALID_RESPONSES.ERROR.NOT_EXIST.TECHNICIAN);
          return;
        }
        delete item.technician;
        delete item.technicianId;
        item.technician = { id: technicianId };
        const initiatorId = item.initiator ? item.initiator.id : item.initiatorId;
        if (initiatorId && ! await TechniciansService.exists(technicianId)) {
          reject(VALID_RESPONSES.ERROR.NOT_EXIST.TECHNICIAN);
          return;
        }
        delete item.initiator;
        delete item.initiatorId;
        item.initiator = { id: initiatorId };
        LoggerUtility.info(`${logHeader} valid initiator ${initiatorId}`);
        const addressId = item.address ? item.address.id : item.addressId;
        if (addressId && ! await AddressesService.exists(addressId)) {
          reject(VALID_RESPONSES.ERROR.NOT_EXIST.MACHINE);
          return;
        }
        delete item.address;
        delete item.addressId;
        item.address = { id: addressId };
        LoggerUtility.info(`${logHeader} valid address ${addressId}`);
        if (!item.dateCall) {
          item.dateCall = new Date();
        }
        item = TasksService.removeUnsafeProperties(item);
        LoggerUtility.debug(`${logHeader}`, item);
        const newItem = await getConnection().manager.save(Tasks, item);
        LoggerUtility.info(`${logHeader} success ${newItem.id}`);
        LoggerUtility.debug(`${logHeader}`, newItem);
        resolve(this.getById({ id: newItem.id, deleted: Deleted.ALL }));
        return;
    });
  }

  /**
   * Delete one task.
   * Delete one task.
   *
   * id Long id to delete or search
   * returns IdInteger
   */
  public static delete(id) {
    return new Promise((resolve, reject) => {
      const examples = {};
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }

  /**
   * Edit one task.
   * Edit one task.
   *
   * body Tasks
   * returns Tasks
   */
  public static edit(body) {
    return new Promise((resolve, reject) => {
      const examples = {};
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }

  /**
   * Get one task.
   * Get one task.
   *
   * id Long id to delete or search
   * deleted Deleted Get all, deleted, not deleted data. Default not deleted. (optional)
   * returns Tasks
   */
  public static getById(params: ParametersIdDeleted): Promise<Tasks> {
    const FUNCTION_NAME = "getById";
    const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
    return new Promise<Tasks>(async (resolve, reject) => {
    LoggerUtility.info(`${logHeader}`);
    LoggerUtility.debug(`${logHeader} with`, params);
    const previous: Tasks = await getConnection().manager.findOne(Tasks,
      DatabaseUtilities.getFindOneObject(params.id, params.deleted, Tasks));
    if (!previous) {
      LoggerUtility.warn(`${logHeader} not exists with id=${params.id} and deleted=${params.deleted.toString()}`);
      reject(VALID_RESPONSES.ERROR.NOT_EXIST.TASK);
      return;
    }
    LoggerUtility.info(`${logHeader} got ${previous.id}`);
    resolve(previous);
    return;
    });
  }

  /**
   * Get all tasks.
   * Get all tasks.
   *
   * skip Integer number of item to skip (optional)
   * limit Integer max records to return (optional)
   * orderBy String order by property. (optional)
   * filterBy String filter data. (optional)
   * deleted Deleted Get all, deleted, not deleted data. Default not deleted. (optional)
   * metadata Boolean If metadata is needed (for pagination controls) (optional)
   * refClient String Data from a desired contract (optional)
   * returns inline_response_200
   */
  public static get(params: ParametersComplete): Promise<{metadata: Metadata, items: Array<Tasks>}>  {
    const FUNCTION_NAME = "get";
    const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
    return new Promise(async (resolve, reject) => {
      LoggerUtility.info(`${logHeader}`);
      const object = DatabaseUtilities.getFindObject(params, Tasks);
      if (!object) {
          LoggerUtility.warn(`${logHeader} order param malformed`, params.orderBy);
          reject(VALID_RESPONSES.ERROR.PARAMS.MALFORMED.ORDERBY);
          return;
      }
      LoggerUtility.debug(`${logHeader} with`, object);
      const [items, total] = await getConnection().manager.findAndCount(Tasks, object);
      if (!items || !items.length) {
          LoggerUtility.warn(`${logHeader} empty result`);
          resolve();
          return;
      }
      LoggerUtility.info(`${logHeader} got ${items.length}`);
      resolve(Utilities.getMetadataFormat(items, total, params));
      return;
    });
  }

}
