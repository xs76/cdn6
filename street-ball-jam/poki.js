runOnStartup(async runtime => {
	
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime)
{
	var tag = document.getElementsByTagName('script')[0];
	const script = document.createElement('script');
	script.src = 'patch/poki-sdk.js';
	tag.parentNode.insertBefore(script, tag);
	script.onload = () => PokiSDK.init()
		.then(() => runtime.callFunction('Poki.ready'))
		.catch(() => runtime.callFunction('Poki.failed'));
}



