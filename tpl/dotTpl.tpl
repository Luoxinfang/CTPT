{{~it.rows :row:i}}
  <tr>
    <td><input type="checkbox" name="row" value="{{=row.id}}"/></td>
    <td>{{=row.id}}</td>
    <td data-name="{{=row.name}}">{{=row.firstName+'.'+row.lastName}}</td>
    <td data-used-name="{{=row.usedName}}">
      <select name="usedName">
        {{~row.usedName :item:j}}
        <option value="{{=item}}">{{=item}}</option>
        {{~}}
      </select>
    </td>
    <td>{{=row.teem}}</td>
    <td>More info...</td>
    <td>More info...</td>
    <td>More info...</td>
    <td class="edit">
      {{? row.firstName == 'Lin' }}
      <a href="javascript:void(0);">Edit</a>
      {{??}}
      Edit
      {{?}}
    </td>
  </tr>
{{~}}