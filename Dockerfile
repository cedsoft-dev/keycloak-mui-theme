FROM quay.io/keycloak/keycloak:latest as builder

ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

#ENV KC_FEATURES=token-exchange
ENV KC_DB=mariadb

# Copy theme
RUN ls -al /opt/keycloak/providers
# Install custom providers
COPY build_keycloak/target/keycloakify-starter-keycloak-theme-*.jar /opt/keycloak/providers/keycloak-mui-theme.jar
RUN ls -al /opt/keycloak/providers

WORKDIR /opt/keycloak
RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:localhost,IP:127.0.0.1" -keystore conf/server.keystore
RUN /opt/keycloak/bin/kc.sh build
RUN ls -al /opt/keycloak/providers


FROM quay.io/keycloak/keycloak:latest
COPY --from=builder /opt/keycloak/ /opt/keycloak/
# for demonstration purposes only, please make sure to use proper certificates in production instead
# change these values to point to a running postgres instance
ENV KC_DB=mariadb
ENV KC_DB_URL=jdbc:mariadb://mariadb:3306/keycloak
ENV KC_DB_USERNAME=keycloak
ENV KC_DB_PASSWORD=keycloak
ENV KC_DB_HOSTNAME=localhost
ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
