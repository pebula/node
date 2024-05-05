import { Ctor } from '../utils';

 /**
 * Private members of SchemaType for use in derived implementations
 */
export interface SchemaTypePrivate {

  /**
   * The class that Mongoose uses internally to instantiate this SchemaType's `options` property.
   * @memberOf SchemaType
   * @instance
   * @api private
   */
  Constructor: Ctor<any> & any;

  /**
   * Gets the default value
   *
   * @param {Object} scope the scope which callback are executed
   * @param {Boolean} init
   * @api private
   */
  getDefault(scope: any, init?: boolean, options?: any): any;

  /**
   * Applies setters
   *
   * @param {Object} value
   * @param {Object} scope
   * @param {Boolean} init
   * @return {Any}
   * @api private
   */
  applySetters(value: any, scope: any, init: boolean, priorVal?: any, options?: any): any;

  /**
   * Applies getters to a value
   *
   * @param {Object} value
   * @param {Object} scope
   * @api private
   */
  applyGetters(value: any, scope: any): any;

  clone(): this;
}
