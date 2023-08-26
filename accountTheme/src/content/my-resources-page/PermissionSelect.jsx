"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const React = require("react");
const react_core_1 = require("@patternfly/react-core");

class ScopeValue {
    constructor(value) {
        this.value = value;
    }

    toString() {
        return this.value.displayName ? this.value.displayName : this.value.name;
    }

    compareTo(selectOption) {
        return selectOption.name === this.value.name;
    }
}

class PermissionSelect extends React.Component {
    constructor(props) {
        super(props);
        this.onSelect = (_event, selection) => {
            const {selected} = this.state;
            const {onSelect} = this.props;
            if (selected.includes(selection)) {
                this.setState(prevState => ({selected: prevState.selected.filter(item => item !== selection)}), () => onSelect(this.state.selected.map(sv => sv.value)));
            } else {
                this.setState(prevState => ({selected: [...prevState.selected, selection]}), () => onSelect(this.state.selected.map(sv => sv.value)));
            }
        };
        this.onToggle = (isExpanded) => {
            this.setState({
                isExpanded
            });
        };
        this.clearSelection = () => {
            this.setState({
                selected: [],
                isExpanded: false
            });
            this.props.onSelect([]);
        };
        let values = [];
        if (this.props.selected) {
            values = this.props.selected.map(s => new ScopeValue(s));
        }
        this.state = {
            isExpanded: false,
            selected: values,
            scopes: this.props.scopes.map((option, index) => (<react_core_1.SelectOption key={index}
                                                                                         value={values.find(s => s.compareTo(option)) || new ScopeValue(option)}/>))
        };
    }

    render() {
        const {isExpanded, selected} = this.state;
        const titleId = 'permission-id';
        return (<div>
        <span id={titleId} hidden>
          Select the permissions
        </span>
            <react_core_1.Select direction={this.props.direction || 'down'}
                                 variant={react_core_1.SelectVariant.typeaheadMulti}
                                 ariaLabelTypeAhead="Select the permissions" onToggle={this.onToggle}
                                 onSelect={this.onSelect} onClear={this.clearSelection} selections={selected}
                                 isExpanded={isExpanded} ariaLabelledBy={titleId}
                                 placeholderText="Select the permissions">
                {this.state.scopes}
            </react_core_1.Select>
        </div>);
    }
}

exports.PermissionSelect = PermissionSelect;
//# sourceMappingURL=PermissionSelect.jsx.map