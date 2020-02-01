/* apiAccess.js */

window.onload = () => {
	result = document.getElementById("result");
}

const apiAccess = async () => {
	const input = document.getElementById("textbox").value;
	const keyword = encodeURIComponent(input);
	const url = "https://jpsearch.go.jp/api/item/search/jps-cross?keyword=" + keyword;
	
	const response = await fetch(url).catch(err => alert(err));
	const json = await response.json().catch(err => alert(err));

	showResult(json);
}

const showResult = (data) => {
	var tag = "";
	data.list.forEach(x => {
		tag = tag + `<tr><td><img src="${x.common.thumbnailUrl}"></td><td>${x.id}</td><td>${x.common.title}</td><td>${x.common.linkUrl}</td></tr>`;
	});
	result.innerHTML = "<table>" + tag + "</table>";
}
