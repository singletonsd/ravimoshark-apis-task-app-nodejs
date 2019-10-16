"use strict";

import { getConnection } from "typeorm";
import { Interventions } from "../databases/entities";
import { DatabaseUtilities } from "../databases/utils/DatabaseUtils";
import { Metadata } from "../models";
import { LoggerUtility } from "../utils/LoggerUtility";
import { ParametersComplete, ParametersIdDeleted, Utilities } from "../utils/utilities";
import { VALID_RESPONSES } from "../utils/ValidResponses";

const SERVICE_NAME = "InterventionsService";
export class InterventionsService {

  /**
   * Add one intervention.
   * Add one intervention.
   *
   * body Interventions
   * returns Interventions
   */
  public static add(body) {
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
   * Delete one intervention.
   * Delete one intervention.
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
   * Edit one intervention.
   * Edit one intervention.
   *
   * body Interventions
   * returns Interventions
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
   * Get one intervention.
   * Get one intervention.
   *
   * id Long id to delete or search
   * deleted Deleted Get all, deleted, not deleted data. Default not deleted. (optional)
   * returns Interventions
   */
  public static getById(params: ParametersIdDeleted): Promise<Interventions> {
    const FUNCTION_NAME = "getById";
    const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
    return new Promise<Interventions>(async (resolve, reject) => {
    LoggerUtility.info(`${logHeader}`);
    LoggerUtility.debug(`${logHeader} with`, params);
    const previous: Interventions = await getConnection().manager.findOne(Interventions,
      DatabaseUtilities.getFindOneObject(params.id, params.deleted, Interventions));
    if (!previous) {
      LoggerUtility.warn(`${logHeader} not exists with id=${params.id} and deleted=${params.deleted.toString()}`);
      reject(VALID_RESPONSES.ERROR.NOT_EXIST.INTERVENTION);
      return;
    }
    LoggerUtility.info(`${logHeader} got ${previous.id}`);
    resolve(previous);
    return;
    });
  }

  /**
   * Get all interventions.
   * Get all interventions.
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
  public static get(params: ParametersComplete): Promise<{metadata: Metadata, items: Array<Interventions>}>  {
    const FUNCTION_NAME = "get";
    const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
    return new Promise(async (resolve, reject) => {
      LoggerUtility.info(`${logHeader}`);
      const object = DatabaseUtilities.getFindObject(params, Interventions);
      if (!object) {
          LoggerUtility.warn(`${logHeader} order param malformed`, params.orderBy);
          reject(VALID_RESPONSES.ERROR.PARAMS.MALFORMED.ORDERBY);
          return;
      }
      LoggerUtility.debug(`${logHeader} with`, object);
      const [items, total] = await getConnection().manager.findAndCount(Interventions, object);
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
