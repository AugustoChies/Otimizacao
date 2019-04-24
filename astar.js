 function findPath(startnode, endnode)
          {              
              var path = [];
              var StarNodes = [];
              var openlist = [];
              var closedlist =[];
              
              if(startnode.x == endnode.x && startnode.y == endnode.y)
                  {
                      path.push(startnode);
                      return path;
                  }
              
              
              for(i = 0; i < nodes.length; i++){
		          var sn = {x:nodes[i].x , y: nodes[i].y, edgelist:nodes[i].edgelist, edgeindexlist:nodes[i].edgeindexlist, h:getDistance(nodes[i],endnode), g:0, f:0, parentindex: -2};
                  StarNodes.push(sn);
		      }
              
              closedlist.push(StarNodes[findpointindex(startnode,StarNodes)]);        
              
              var end = false;
              
              while(!end)
                  {
                        var lastnode = closedlist[closedlist.length -1];
                        for(i = 0; i < lastnode.edgelist.length; i++)
                         {  
                              if(StarNodes[edgeList[lastnode.edgeindexlist[i]].index1].x == endnode.x && StarNodes[edgeList[lastnode.edgeindexlist[i]].index1].y == endnode.y)
                                  {
                                      StarNodes[edgeList[lastnode.edgeindexlist[i]].index1].parentindex = findpointindex(lastnode,StarNodes);
                                      end = true;
                                      break;
                                  }
                              else if(StarNodes[edgeList[lastnode.edgeindexlist[i]].index2].x == endnode.x && StarNodes[edgeList[lastnode.edgeindexlist[i]].index2].y == endnode.y)
                                  {
                                      StarNodes[edgeList[lastnode.edgeindexlist[i]].index2].parentindex = findpointindex(lastnode,StarNodes);
                                      end = true;
                                      break;
                                  }
            
                         }
                        
                        addToOpenList(closedlist[closedlist.length -1],StarNodes,openlist,closedlist);
                        
                        openlist.sort(comparenodebyF);
                        
                        closedlist.push(openlist[0]);
                        openlist.splice(0,1);
                  }             
              
                
                
               
              path.push(StarNodes[findpointindex(endnode,StarNodes)]);
              while(path[path.length - 1].parentindex != -2)
                  {
                       path.push(StarNodes[path[path.length - 1].parentindex]);
                  }
              for(i = 0; i < path.length; i++){
                 console.log("Node " + i + ": X: " + path[i].x + " Y: " +path[i].y);
                 console.log("Parent: " + path[i].parentindex);  
              }         
              
              return path;
          }
          
          function addToOpenList(parent,StarNodes,openlist,closedlist)
          {
               for(i = 0; i < parent.edgelist.length; i++)
               {                   
                   if(StarNodes[edgeList[parent.edgeindexlist[i]].index1].x == parent.x && StarNodes[edgeList[parent.edgeindexlist[i]].index1].y == parent.y)
                       {                           
                           var opencandidate = StarNodes[edgeList[parent.edgeindexlist[i]].index2];
                           if(findpointindex(opencandidate,closedlist) == -100)
                               {
                                   if(findpointindex(opencandidate,openlist) == -100)
                                       {
                                            openlist.push(opencandidate);   
                                            openlist[openlist.length - 1].parentindex = findpointindex(parent,StarNodes);
                                            openlist[openlist.length - 1].g = parent.g + parent.edgelist[i].cost;
                                            openlist[openlist.length - 1].f = openlist[openlist.length - 1].g + openlist[openlist.length - 1].h;
                                       }
                                   else
                                       {
                                            var newg = parent.g + parent.edgelist[i].cost;
                                            if(newg < opencandidate.g)
                                                {
                                                    StarNodes[edgeList[parent.edgeindexlist[i]].index2].parentindex = findpointindex(parent,StarNodes);
                                                    StarNodes[edgeList[parent.edgeindexlist[i]].index2].g = newg;
                                                    StarNodes[edgeList[parent.edgeindexlist[i]].index2].f = newg + StarNodes[edgeList[parent.edgeindexlist[i]].index2].h;
                                                }
                                       }
                               }
                       }
                   else
                       {
                           var opencandidate = StarNodes[edgeList[parent.edgeindexlist[i]].index1];
                           if(findpointindex(opencandidate,closedlist) == -100)
                               {
                                   if(findpointindex(opencandidate,openlist) == -100)
                                       {
                                            openlist.push(opencandidate);    
                                            openlist[openlist.length - 1].parentindex = findpointindex(parent,StarNodes);
                                            openlist[openlist.length - 1].g = parent.g + parent.edgelist[i].cost;
                                            openlist[openlist.length - 1].f = openlist[openlist.length - 1].g + openlist[openlist.length - 1].h;
                                       }
                                   else
                                       {
                                            var newg = parent.g + parent.edgelist[i].cost;
                                            if(newg < opencandidate.g)
                                                {
                                                    StarNodes[edgeList[parent.edgeindexlist[i]].index1].parentindex = findpointindex(parent,StarNodes);
                                                    StarNodes[edgeList[parent.edgeindexlist[i]].index1].g = newg;
                                                    StarNodes[edgeList[parent.edgeindexlist[i]].index1].f = newg + StarNodes[edgeList[parent.edgeindexlist[i]].index1].h;
                                                }
                                       }
                               }
                       }                   
               }
          }
          
          function comparenodebyF(p1,p2)
		  {
			  return p1.f - p2.f;
		  }