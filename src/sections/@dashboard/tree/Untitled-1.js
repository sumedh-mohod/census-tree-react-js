
    autoTable(doc, {
        margin: margin_,
        headStyles: headStyles_,
        head: [['BY TREE NAMES']],
      });
  
      // const chartEl = document.getElementById('barChart123');
     
  
      autoTable(doc, {
        margin: { bottom: 10 },
        head: [['#', 'Tree Names', 'Counts']],
        body: treeNameValue1,
        
      });
  
      autoTable(doc, {
        margin: margin_,
        headStyles: headStyles_,
        head: [['BY TREE TYPES']],
      });
      
      autoTable(doc, {
        margin: { bottom: 10 },
        head: [['#', 'Tree Types', 'Counts']],
        body: treeType1,
      });
  
      autoTable(doc, {
        margin: margin_,
        headStyles: headStyles_,
        head: [['BY TREE CONDITIONS']],
      });
      autoTable(doc, {
        margin: { bottom: 10 },
        head: [['#', 'Tree Conditions', 'Counts']],
        body: TreeCondition1,
      });




      

      for(let i=0;i<arr.length;i+=1){
        const canvas_ = await Html2canvas(canvas[i])
           imgData = await canvas_.toDataURL('image/png');
          // console.log('asda', i, imgData);
          autoTable(doc, {
            margin: { top: 10, bottom: 10 },
            headStyles: headStyles_,
            head: [header[i]],
          });
          autoTable(doc, {
            margin: { bottom: 10 },
            head: [headerBody[i]],
            body: body_[i],
          });
          // doc.output('dataurlnewwindow');
        }
        /* eslint-enable no-await-in-loop */
        doc.addImage(imgData, 'JPEG', 10, 10, 180, 150);
        doc.save(`${councilName}.pdf`);


        for(let i=0;i<arr.length;i+=1){
            const canvas_ = await Html2canvas(canvas[i])
              //  imgData = await canvas_.toDataURL('image/png');
              console.log('asda', i, canvas_);
              autoTable(doc, {
                margin: { top: 170, bottom: 10 },
                headStyles: headStyles_,
                head: [header[i]],
              });
              doc.addImage(canvas_.toDataURL('image/png'), 'JPEG', 10, 10, 180, 150)
              autoTable(doc, {
                margin: { top:10, bottom: 10 },
                head: [headerBody[i]],
                body: body_[i],
              });