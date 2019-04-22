 

          var basePoint;

	      function gethull(points){
	            
                var hullPath = [];
	            var lowesty = points[0];
	            hullPath.push(points[0]);
	            for(i = 1; i < points.length; i++){
                    
                      if(points[i].y == lowesty.y)
                          {
                              if(points[i].x < lowesty.x)//tiebreak by x;
	          			       {
                                     lowesty = points[i];
                                     hullPath[0] = points[i];
	          			       }
                          }
	          		else if(points[i].y < lowesty.y)
	          			{
	          				lowesty = points[i];
	          				hullPath[0] = points[i];
	          			}
	            }
              
                basePoint = hullPath[0];
	            
	            points.sort(comparepointbyangle);     
                
	            
	            //for(i = 0; i < points.length; i++){
	          	//  console.log("X: " + points[i].x  + ", Y: " + points[i].y);
	          	//  var basevec = {x: 1, y: 0};
	          	//  var vec1 = {x: points[i].x - hullPath[0].x, y: points[i].y - hullPath[0].y};
	          	//  
	          	//  console.log(computeAngle(basevec,vec1));
	            //}
                
               
	            grahamScan(points,hullPath);
	           
              
                return hullPath;
	           
          }
		 
		  
		  function ccw(p1, p2, p3) {
			  // ccw > 0: counter-clockwise; ccw < 0: clockwise; ccw = 0: collinear
			  return (p2.x - p1.x) * (p3.y - p1.y)
				  - (p2.y - p1.y) * (p3.x - p1.x);
		  }
		  function polarAngle(p) {
			  return Math.atan(p.y / p.x);
		  }
		  function dotProduct(vec1, vec2) {
			  return (vec1.x * vec2.x + vec1.y * vec2.y);
		  }
		  function norm(vec) {
			  return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
		  }
		  function computeAngle(v1, v2) {
			  var ac = dotProduct(v1, v2);
			  return Math.acos(ac / (norm(v1) * norm(v2))) * 57.2958;
		  }	  
		  
		  function triangleArea (A,B,C) {//needs math abs because returns negative are sometimes
			  return Math.abs((A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y))/2.0);
		  }
		
		  function isInsideTriangle(point,t1,t2,t3)
		  {
			  var vec1 = {x: t3.x - t1.x, y: t3.y - t1.y};
			  var vec2 = {x: t2.x - t1.x, y: t2.y - t1.y};
			  var vec3 = {x: point.x - t1.x, y: point.y - t1.y};
			  
			  var triangle = computeAngle(vec1,vec2);
			  var pointangle = computeAngle(vec1,vec3) + computeAngle(vec2,vec3);
			  
			  return Math.abs(triangle - pointangle) < 0.0001;
		  }
		 
		 
          function getDistance(p1,p2)
          {
              return Math.sqrt( Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2) );
          }
		 
		  
		  
		  function comparepointbyX(p1,p2)
		  {
			  return p1.x - p2.x;
		  }
		  
		  function comparepointbyangle(p1,p2)
		  {
			  var basevec = {x: 1, y: 0};
			  var vec1 = {x: p1.x - basePoint.x, y: p1.y - basePoint.y};
			  var vec2 = {x: p2.x - basePoint.x, y: p2.y - basePoint.y};
              var a1 = computeAngle(basevec,vec1);
              var a2 =  computeAngle(basevec,vec2);
              
              if(p1.x == basePoint.x && p1.y == basePoint.y)
                  {
                      return -1;
                  }
              if(p2.x == basePoint.x && p2.y == basePoint.y)
                  {
                      return 1;
                  }
              
              if(a1 == a2)//tie break by closest
                  {
                      return getDistance(basePoint,p1) - getDistance(basePoint,p2);
                  }
              
			  return a1 - a2;
		  }
		  
		  function findpointindex(point,points)
		  {
			  for(var i= 0;i< points.length;i++)
				  {
					  if(points[i].x == point.x & points[i].y == point.y)
						  {
							  return i;
						  }
				  }
			  return -100;
		  }
          
          
          function grahamScan(points,hullPath)
          {
              hullPath.push(points[1]);
              hullPath.push(points[2]);
              
              for(var i= 3;i< points.length;i++)
				  {
                     
                      while(ccw(hullPath[hullPath.length - 2], hullPath[hullPath.length - 1],points[i]) < 0)
                          {
                              hullPath.pop();
                          }
                      hullPath.push(points[i]);
                  }              
          }
		  
		 
		  
		  

		  
		  