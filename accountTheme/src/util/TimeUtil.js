"use strict";
/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", {value: true});

/**
 * @author Stan Silvert
 */
class TimeUtil {
    constructor() {
        this.options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        try {
            this.formatter = new Intl.DateTimeFormat(locale, this.options);
        } catch (e) {
            // unknown locale falling back to English
            this.formatter = new Intl.DateTimeFormat('en', this.options);
        }
    }

    format(time) {
        return this.formatter.format(time);
    }
}

const TimeUtilInstance = new TimeUtil();
exports.default = TimeUtilInstance;
//# sourceMappingURL=TimeUtil.js.map