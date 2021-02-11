import { Component, IComponentBindings, ComponentOptions, IQueryResult, IFieldOption } from 'coveo-search-ui';
import { lazyComponent } from '@coveops/turbo-core';

export interface IShowIfFieldValueOptions {
    field: IFieldOption,
    fieldValue: string
}

@lazyComponent
export class ShowIfFieldValue extends Component {
    static ID = 'ShowIfFieldValue';
    static options: IShowIfFieldValueOptions = {
        field: ComponentOptions.buildFieldOption({required: true}),
        fieldValue: ComponentOptions.buildStringOption()
    };

    constructor(public element: HTMLElement, public options: IShowIfFieldValueOptions, public bindings: IComponentBindings, public result?: IQueryResult,) {
        super(element, ShowIfFieldValue.ID, bindings);
        this.options = ComponentOptions.initComponentOptions(element, ShowIfFieldValue, options);
        this.render();
    }

    protected render(){
       let field = <string>this.options.field;
       //IFieldOpton is always prefixed with @; remove it
       field = field.substr(1);
       let resultValue = this.result.raw[field];
       if(resultValue !== this.options.fieldValue){
            Coveo.$$(this.element).hide();
       }
    }
}