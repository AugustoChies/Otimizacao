 var edgeList = [];
 var nodes = [];
          
          
          function CreateGraph(points,hullPath)
          {
             
              
              // var node = {x:0 , y: 0, edgelist:[]};
              // var edge = {index1:0, index2:0, cost: 0};              
              
              //push hullpath into nodes and create edges
              for(var i= 0;i < hullPath.length;i++)
                  {
                      var index = findpointindex(hullPath[i],points);
                      points.splice(index,1);  
                      
                      var node= {x:hullPath[i].x , y: hullPath[i].y, edgelist:[], edgeindexlist:[]};
                      nodes.push(node);                      
                  }
              
              for(var i= 0;i < nodes.length - 1;i++)
                  {
                      var edge = {index1:i, index2:i+1, cost: getDistance(nodes[i],nodes[i+1])};         
                      edgeList.push(edge);
                      
                      nodes[i].edgelist.push(edge);
                      nodes[i].edgeindexlist.push(i);
                      nodes[i+1].edgelist.push(edge);
                      nodes[i+1].edgeindexlist.push(i);
                  }
              var edge = {index1:nodes.length - 1, index2:0, cost: getDistance(nodes[nodes.length - 1],nodes[0])};         
              edgeList.push(edge);
              
              nodes[nodes.length - 1].edgelist.push(edge);
              nodes[nodes.length - 1].edgeindexlist.push(edgeList.length - 1);
              nodes[0].edgelist.push(edge);
              nodes[0].edgeindexlist.push(edgeList.length - 1);
              
              //add other points to nodes and compute max edge size
              for(var i= 0;i < points.length;i++)
                  {
                      var node = {x:points[i].x , y: points[i].y, edgelist:[], edgeindexlist:[]};
                      nodes.push(node);     
                  }
              
              var maiorMenorDistancia = 0;
              
              
              
              for(var i= 0;i < points.length;i++)
                  {
                      var menorDistancia = Infinity;                      
                      for(var j= 0;j < hullPath.length;j++)
                          {
                              var tempdist = getDistance(points[i],hullPath[j]);
                              if(tempdist < menorDistancia)
                                  {
                                      menorDistancia = tempdist;                                      
                                  }
                          }
                      
                      if(menorDistancia > maiorMenorDistancia)
                          {
                              maiorMenorDistancia = menorDistancia;                              
                          }                      
                  }
              
             // console.log(maiorMenorDistancia);
            //  console.log("Hullpoint: x: " + hullPath[jhull].x + " y: " + hullPath[jhull].y);              
              //console.log("Insidepoint: x: " + points[ipoint].x + " y: " + points[ipoint].y);
              
              //creates aditional edges
              //points to hull
              
              //for(var i= 0;i < points.length;i++)
              //    {     
              //        var closesthullpoint;
              //        var chpdistance = Infinity;
              //        for(var j= 0;j < hullPath.length;j++)
              //            {                              
              //                var tempdist = getDistance(points[i],hullPath[j]);
              //                if(tempdist <= maiorMenorDistancia)
              //                    {
              //                       if(tempdist < chpdistance)
              //                           {
              //                               chpdistance = tempdist;
              //                               closesthullpoint = j;
              //                           }
              //                        
              //                    }
              //            }
              //        var edge = {index1:closesthullpoint, index2:i + hullPath.length, cost: chpdistance};         
              //        edgeList.push(edge);
              //        
              //        nodes[closesthullpoint].edgelist.push(edge);
              //        nodes[closesthullpoint].edgeindexlist.push(edgeList.length - 1);
              //        nodes[i+hullPath.length].edgelist.push(edge);
              //        nodes[i+hullPath.length].edgeindexlist.push(edgeList.length - 1);      
              //                     
              //    }
              
              //one new edge per point for all points(none if no close point remains)
              for(var i= 0;i < nodes.length;i++)
                  {     
                      var closesthullpoint = -2;//no point
                      var edgeammount = Infinity;
                      for(var j= i + 1;j < nodes.length;j++)
                          {                              
                              var tempdist = getDistance(nodes[i],nodes[j]);
                              var tempedgecount = nodes[j].edgelist.length;
                              if(tempdist <= maiorMenorDistancia)
                                  {
                                     var isdifferent = true;
                                     for(var k = 0;k < nodes[i].edgelist.length;k++)
                                         {
                                            if(j == nodes[i].edgelist[k].index1 || j == nodes[i].edgelist[k].index2)
                                                {
                                                    isdifferent=false;
                                                }
                                         }
                                      
                                     if(tempedgecount < edgeammount && isdifferent)
                                         {
                                             edgeammount = tempedgecount;
                                             closesthullpoint = j;
                                         }
                                      
                                  }
                          }
                      if(closesthullpoint != -2)
                          {
                              var edge = {index1:closesthullpoint, index2:i, cost: getDistance(nodes[i],nodes[closesthullpoint])};         
                              edgeList.push(edge);
                              
                              nodes[closesthullpoint].edgelist.push(edge);
                              nodes[closesthullpoint].edgeindexlist.push(edgeList.length - 1);
                              nodes[i].edgelist.push(edge);
                              nodes[i].edgeindexlist.push(edgeList.length - 1);                              
                          }
                                   
                  }             
		  }
          
          function megaDebug()
          {
              for(var i= 0;i < nodes.length;i++)
                  { 
                      console.log("Node " + i +": " + "X: " + nodes[i].x + " Y: " + nodes[i].y + ", connected edges: " + nodes[i].edgelist.length);
                      for(var j= 0;j < nodes[i].edgelist.length;j++)
                         {
                              console.log("Edge " + j + " index: " + nodes[i].edgeindexlist[j]);                           
                         }
                  }
              for(var i= 0;i < edgeList.length;i++)
                  {
                      console.log("Edge " + i +": " + "P1index: " + edgeList[i].index1 + " P2index: " + edgeList[i].index2 + ", length: " + edgeList[i].cost);
                  }
          }