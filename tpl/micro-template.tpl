<script type="text/html" id="user_tpl">
  <%
  for(var i=0,l=rows.length; i < l ; i++){
  var row=rows[i];
  var usedName=row.usedName;
  %>
  <tr>
    <td><input type="checkbox" name="row" value="<%=row.id%>"/></td>
    <td data-name="<%=row.name%>"><%=row.firstName+row.lastName%></td>
    <td data-used-name="<%=usedName%>">
      <select name="usedName">
        <%
        for(var j=0,len=usedName.length;j< len; j++){
        var item=usedName[j];
        %>
        <option value="<%=item%>"><%=item%></option>
        <%}%>
      </select>
    </td>
    <td>More info...</td>
    <td>More info...</td>
    <td>More info...</td>
    <td class="edit"><a href="javascript:void(0);">Edit</a></td>
  </tr>
  <%
  }
  %>
</script>