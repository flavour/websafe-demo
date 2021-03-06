import os

ROOT = os.path.dirname(__file__)

DATA_PATH = os.path.join(ROOT, 'data')

GS_USERNAME = "root"
GS_PASSWORD = "projectnoah"

GEOSERVER_BASE_URL = 'http://localhost:8080/geoserver/'
GEOSERVER_REST_URL = GEOSERVER_BASE_URL + 'rest'
GEOSERVER_COOKIE_URL = GEOSERVER_BASE_URL +'j_spring_security_check'

GS_EXPOSURE_WS = 'exposure'
GS_HAZARD_WS = 'hazard'
GS_IMPACT_WS = 'impact'