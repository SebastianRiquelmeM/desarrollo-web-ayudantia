console.log("[");
for (let i = 0; i < 50; i++) {
	console.log("   {");
	console.log('\t"numero": ', i + 1, ",");
	console.log('\t"vendido": ', 0);
	if (i == 49) {
		console.log("   }");
	} else {
		console.log("   },");
	}
}
console.log("]");
