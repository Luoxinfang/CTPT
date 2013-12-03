<tr>
  <td>tpl\num</td>
  <%for(var i=0,l=dataNumArr.length; i < l; i++){%>
  <td><%=dataNumArr[i]%></td>
  <%}%>
</tr>
<%for(var i=0,l=tplArr.length; i < l; i++){%>
  <tr data-type="<%=tplArr[i].id%>">
    <td><%=tplArr[i].id%></td>
    <%for(var j=0,len=dataNumArr.length; j < len; j++){%>
    <td></td>
    <%}%>
  </tr>
<%}%>