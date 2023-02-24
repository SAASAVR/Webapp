const AppTabs = {
    Hardware: Symbol("hardware"),
    Database: Symbol("database"),
  };

function getAppTabsString(tab) {
    let name;
    switch (tab) {
        case AppTabs.Hardware:
            name = "Hardware"
        break;
        case AppTabs.Database:
            name = "Database"
        break;
        default:
            name = "NotFound"
    };
    return name;
}

export {AppTabs, getAppTabsString}