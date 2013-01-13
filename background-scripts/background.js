function setIcon(tab, enabled) {
	if (enabled) {
		chrome.pageAction.setIcon({ tabId: tab.id, path: 'enabled-icon-19.png' });
	} else {
		chrome.pageAction.setIcon({ tabId: tab.id, path: 'disabled-icon-19.png' });
	}
}

function showPageAction(tabID, changeInfo, tab) {
	if (tab.url.match(/^https?:\/\/www\.google\..*\/search/)) {
		chrome.storage.sync.get('enabled', function(item) {
			setIcon(tab, item.enabled);
			chrome.pageAction.show(tabID);
		});
	}
}

function toggleState(tab) {
	chrome.storage.sync.get('enabled', function(item) {
		console.log('togglestate', item.enabled);

		setIcon(tab, item.enabled);

		item.enabled = !item.enabled;
		chrome.storage.sync.set({ 'enabled': item.enabled });
	});
}

function installed() {
	chrome.storage.sync.get('enabled', function(item) {
		if (item.enabled == undefined) {
			item.enabled = true;
			chrome.storage.sync.set({ 'enabled': item.enabled });
		}
	});
}

chrome.runtime.onInstalled.addListener(installed);
chrome.pageAction.onClicked.addListener(toggleState);
chrome.tabs.onUpdated.addListener(showPageAction);
