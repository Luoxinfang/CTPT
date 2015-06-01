<tr>
  <td class="bg-blur">tpl\num</td>
  <%for(var i=0,l=dataNumArr.length; i < l; i++){%>
  <td class="bg-blur" colspan="2"><%=dataNumArr[i]%></td>
  <%}%>
  <td class="bg-blur">#</td>
</tr>
<tr>
  <td class="bg-blur">比较项</td>
  <%for(var i=0,l=dataNumArr.length; i < l; i++){%>
  <td class="bg-blur">编译</td>
  <td class="bg-blur">渲染</td>
  <%}%>
  <td class="bg-blur">每毫秒(次)</td>
</tr>
<%for(var i=0,l=tplArr.length; i < l; i++){%>
<tr data-type="<%=tplArr[i].id%>">
  <td><%=tplArr[i].id%></td>
  <%for(var j=0,len=dataNumArr.length; j < len; j++){%>
  <td></td><td></td>
  <%}%>
  <td class="red"></td>
</tr>
<%}%>