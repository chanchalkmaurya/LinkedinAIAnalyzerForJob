export const APP_CONFIG = {
    NAME: process.env.NEXT_PUBLIC_APP_NAME || "LinkedIn Analyzer AI",

    API_BASE_URL:
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "http://127.0.0.1:8000",

    REQUEST_TIMEOUT: 60000,

    MAX_JOB_DESCRIPTION_LENGTH: 10000,
    GITHUB_URL: "https://github.com/chanchalkmaurya"
};