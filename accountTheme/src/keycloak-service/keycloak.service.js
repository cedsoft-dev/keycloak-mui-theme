"use strict";
Object.defineProperty(exports, "__esModule", {value: true});

class KeycloakService {
    constructor(keycloak) {
        this.keycloakAuth = keycloak;
    }

    authenticated() {
        return this.keycloakAuth.authenticated ? this.keycloakAuth.authenticated : false;
    }

    audiencePresent() {
        if (this.keycloakAuth.tokenParsed) {
            const audience = this.keycloakAuth.tokenParsed['aud'];
            return audience === 'account' || (Array.isArray(audience) && audience.indexOf('account') >= 0);
        }
        return false;
    }

    login(options) {
        this.keycloakAuth.login(options);
    }

    logout(redirectUri = baseUrl) {
        this.keycloakAuth.logout({redirectUri: redirectUri});
    }

    account() {
        this.keycloakAuth.accountManagement();
    }

    authServerUrl() {
        const authServerUrl = this.keycloakAuth.authServerUrl;
        return authServerUrl.charAt(authServerUrl.length - 1) === '/' ? authServerUrl : authServerUrl + '/';
    }

    realm() {
        return this.keycloakAuth.realm;
    }

    getToken() {
        return new Promise((resolve, reject) => {
            if (this.keycloakAuth.token) {
                this.keycloakAuth
                    .updateToken(5)
                    .success(() => {
                        resolve(this.keycloakAuth.token);
                    })
                    .error(() => {
                        reject('Failed to refresh token');
                    });
            } else {
                reject('Not logged in');
            }
        });
    }
}

exports.KeycloakService = KeycloakService;
//# sourceMappingURL=keycloak.service.js.map