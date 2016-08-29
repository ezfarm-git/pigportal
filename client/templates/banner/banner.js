Template.banner.onRendered(function() {
	var num  = 2;
	var RandomNum = 1;
	var sNum = '';
	var sHtml = "";
	var LinkNum = 0;
	var	sLink = new Array(5)
		sLink = ['http://www.intron.co.kr','http://www.bikr.co.kr']
	for (i=0;i<num ;i++)
	{
		RandomNum = Math.ceil(Math.random() * num);
		if(sNum==RandomNum )
		{
			i--;			
		}else{
			sNum = RandomNum;
			LinkNum = RandomNum - 1;
			sHtml = sHtml + '<div class="banner"><a href="'+sLink[LinkNum]+'" target="_blank" class="underline-none">'
			sHtml = sHtml + '<img src="/images_banner/banner_corp_0'+RandomNum+'.png" alt="" width="100%">'
			sHtml = sHtml + '</a></div>'
		}
	}
	$("#Banner_layer").html(sHtml);
})
	
