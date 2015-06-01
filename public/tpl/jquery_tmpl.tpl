{{#each rows}}
  <tr>
    <td><input type="checkbox" name="row" value="{{id}}"/></td>
    <td>{{id}}</td>
    <td data-name="{{name}}">{{firstName}}.{{lastName}}</td>
    <td data-used-name="{{usedName}}">
      <select name="usedName">
        {{#each usedName}}
        <option value="{{this}}">{{this}}</option>
        {{/each}}
      </select>
    </td>
    <td>{{teem}}</td>
    <td>More info...</td>
    <td>More info...</td>
    <td>More info...</td>
    <td class="edit">
      {{#isLin firstName}}
      <a href="javascript:void(0);">Edit</a>
      {{else}}
      Edit
      {{/isLin}}
    </td>
  </tr>
{{/each}}